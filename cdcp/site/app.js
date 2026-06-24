/* CDCP Guide — eligibility assistant (prototype)
 *
 * Deterministic rules engine styled as a chat. It implements the decision tree in
 * docs/ELIGIBILITY-REFERENCE.md exactly. We deliberately DO NOT use a probabilistic model to
 * decide eligibility — a wrong "you qualify / you don't" is a trust and liability killer.
 *
 * Production v2 (see STRATEGY.md): wrap this engine in an LLM for natural-language understanding,
 * but keep the final verdict deterministic and grounded in the reference doc.
 */
(function () {
  "use strict";

  var log = document.getElementById("chatLog");
  var inputArea = document.getElementById("inputArea");
  var APPLY_URL =
    "https://www.canada.ca/en/services/benefits/dental/dental-care-plan/apply.html";

  // ---- Conversation flow (mirrors ELIGIBILITY-REFERENCE.md) ----
  var steps = {
    intro: {
      bot: [
        "Hi! I'll help you find out if you likely qualify for the Canadian Dental Care Plan. 🦷",
        "It takes about a minute, it's anonymous, and I only need rough answers. Ready?"
      ],
      choices: [{ label: "Let's go →", next: "residency" }]
    },

    residency: {
      bot: ["First: are you a resident of Canada for tax purposes?"],
      choices: [
        { label: "Yes", next: "taxfiled" },
        { label: "No", next: null, result: "ineligible_residency" }
      ]
    },

    taxfiled: {
      bot: [
        "Have you (and your spouse or common-law partner, if you have one) filed last year's tax return?",
        "CDCP eligibility is based on your most recent return."
      ],
      choices: [
        { label: "Yes, filed", next: "insurance" },
        { label: "Not yet", next: null, result: "not_yet_tax" }
      ]
    },

    insurance: {
      bot: [
        "Do you have <strong>access</strong> to private dental insurance — through an employer, pension, a group/student plan, or one you bought (yours or a family member's)?",
        "Heads up: it counts even if you decline it. But coverage through a <em>government</em> social program does <strong>not</strong> count here."
      ],
      choices: [
        { label: "No private insurance", next: "income" },
        { label: "Only a government program", next: "income" },
        { label: "Yes, I have access", next: null, result: "ineligible_insurance" }
      ]
    },

    income: {
      bot: [
        "Last question — which band is your <strong>adjusted family net income</strong> in? (That's roughly your + your partner's net income, not gross salary.)"
      ],
      choices: [
        { label: "Under $70,000", next: null, result: "eligible_full" },
        { label: "$70,000 – $79,999", next: null, result: "eligible_60" },
        { label: "$80,000 – $89,999", next: null, result: "eligible_40" },
        { label: "$90,000 or more", next: null, result: "ineligible_income" }
      ]
    }
  };

  // ---- Result definitions ----
  var results = {
    eligible_full: {
      verdict: "You likely qualify — at the best tier!",
      cls: "verdict-eligible",
      tier: "CDCP pays 100% · no co-pay",
      body:
        "Based on your answers you meet all four requirements, and with income under $70,000 the plan covers <strong>100% of eligible costs</strong>.",
      notes: [
        "⚠️ Even at 0% co-pay you can owe a difference if your dentist charges above the CDCP established fee — we'll help you find dentists who bill at the CDCP rate.",
        "Covered services include check-ups, cleanings, x-rays, fillings, root canals, dentures and more."
      ],
      primary: { label: "Find a CDCP dentist near me", type: "dentist" }
    },
    eligible_60: {
      verdict: "You likely qualify!",
      cls: "verdict-eligible",
      tier: "CDCP pays 60% · you pay 40%",
      body:
        "You meet all four requirements. In the $70,000–$79,999 band, CDCP covers <strong>60% of eligible costs</strong> and you cover the rest.",
      notes: [
        "Your dentist may also charge a difference above the CDCP established fee — ask up front.",
        "We can connect you with dentists accepting new CDCP patients."
      ],
      primary: { label: "Find a CDCP dentist near me", type: "dentist" }
    },
    eligible_40: {
      verdict: "You likely qualify!",
      cls: "verdict-eligible",
      tier: "CDCP pays 40% · you pay 60%",
      body:
        "You meet all four requirements. In the $80,000–$89,999 band, CDCP covers <strong>40% of eligible costs</strong>.",
      notes: [
        "Because you pay the larger share, it's worth comparing this against a private plan or membership plan — we can show you options.",
        "Your dentist may charge a difference above the CDCP established fee."
      ],
      primary: { label: "Find a CDCP dentist near me", type: "dentist" }
    },
    ineligible_income: {
      verdict: "You're likely over the income limit for CDCP",
      cls: "verdict-no",
      body:
        "CDCP is for adjusted family net income under $90,000. But you still have good options — and you still need a dentist.",
      notes: [
        "Compare private dental insurance or a dental discount/membership plan.",
        "Ask about dental financing / pay-over-time for bigger treatments.",
        "We can still connect you with a great dentist near you."
      ],
      primary: { label: "Show me options + find a dentist", type: "dentist" }
    },
    ineligible_insurance: {
      verdict: "You likely aren't eligible — you have other coverage",
      cls: "verdict-no",
      body:
        "Because you have access to private dental insurance, CDCP won't apply. The good news: you already have coverage to use.",
      notes: [
        "We'll help you find a dentist who accepts your plan.",
        "If that coverage ends (job change, etc.), come back and re-check — eligibility is reviewed yearly."
      ],
      primary: { label: "Find a dentist near me", type: "dentist" }
    },
    ineligible_residency: {
      verdict: "CDCP is for Canadian tax residents",
      cls: "verdict-no",
      body:
        "The plan requires you to be a resident of Canada for tax purposes, so it won't apply right now.",
      notes: ["If your residency status changes, come back and check again."],
      primary: { label: "Learn more at canada.ca", type: "link", url: APPLY_URL }
    },
    not_yet_tax: {
      verdict: "Almost — you need to file your tax return first",
      cls: "verdict-no",
      body:
        "CDCP eligibility is based on your most recent tax return. File it (and your partner's, if applicable), then you can apply.",
      notes: [
        "Filing is what unlocks eligibility even if you had little or no income.",
        "Want a reminder to re-check after you file?"
      ],
      primary: { label: "Remind me to re-check", type: "email" }
    }
  };

  // ---- Rendering helpers ----
  function scroll() {
    log.scrollTop = log.scrollHeight;
  }

  function addMsg(html, who) {
    var d = document.createElement("div");
    d.className = "msg " + who;
    d.innerHTML = html;
    log.appendChild(d);
    scroll();
  }

  function showTyping() {
    var t = document.createElement("div");
    t.className = "typing";
    t.id = "typing";
    t.innerHTML = "<span></span><span></span><span></span>";
    log.appendChild(t);
    scroll();
  }
  function hideTyping() {
    var t = document.getElementById("typing");
    if (t) t.remove();
  }

  function clearInput() {
    inputArea.innerHTML = "";
  }

  // Render a sequence of bot bubbles with a typing delay, then run cb.
  function botSay(lines, cb) {
    clearInput();
    var i = 0;
    function next() {
      if (i >= lines.length) {
        cb && cb();
        return;
      }
      showTyping();
      setTimeout(function () {
        hideTyping();
        addMsg(lines[i], "bot");
        i++;
        setTimeout(next, 250);
      }, 480 + Math.min(lines[i].length * 8, 700));
    }
    next();
  }

  function renderChoices(choices) {
    clearInput();
    choices.forEach(function (c) {
      var b = document.createElement("button");
      b.className = "choice-btn";
      b.type = "button";
      b.textContent = c.label;
      b.onclick = function () {
        addMsg(c.label, "user");
        if (c.result) {
          setTimeout(function () {
            showResult(c.result);
          }, 300);
        } else if (c.next) {
          go(c.next);
        }
      };
      inputArea.appendChild(b);
    });
  }

  function go(stepKey) {
    var step = steps[stepKey];
    botSay(step.bot, function () {
      renderChoices(step.choices);
    });
  }

  // ---- Result + downstream lead-capture flows (the routing in STRATEGY.md §5/§6) ----
  function showResult(key) {
    var r = results[key];
    botSay([], function () {
      var d = document.createElement("div");
      d.className = "msg result";
      var notes = r.notes
        ? "<ul>" + r.notes.map(function (n) { return "<li>" + n + "</li>"; }).join("") + "</ul>"
        : "";
      var tier = r.tier ? '<div class="tier-badge">' + r.tier + "</div>" : "";
      d.innerHTML =
        tier +
        '<h4 class="' + r.cls + '">' + r.verdict + "</h4>" +
        "<p>" + r.body + "</p>" +
        notes;

      var cta = document.createElement("div");
      cta.className = "res-cta";
      var p = r.primary;
      var btn = document.createElement("button");
      btn.className = "btn btn-primary";
      btn.type = "button";
      btn.textContent = p.label;
      btn.onclick = function () { handleCTA(p); };
      cta.appendChild(btn);

      var apply = document.createElement("a");
      apply.className = "btn btn-ghost";
      apply.href = APPLY_URL;
      apply.target = "_blank";
      apply.rel = "noopener";
      apply.textContent = "Official apply ↗";
      cta.appendChild(apply);

      d.appendChild(cta);
      log.appendChild(d);
      scroll();
      clearInput();
      addRestartHint();
    });
  }

  function handleCTA(p) {
    if (p.type === "link") {
      window.open(p.url, "_blank", "noopener");
      return;
    }
    if (p.type === "dentist") {
      // Routing flow — collect city + consent (PIPEDA/Law 25: explicit, purpose-specific consent).
      addMsg(p.label, "user");
      botSay(
        [
          "Great — let's find you a dentist. What city or postal code are you in?"
        ],
        function () {
          textPrompt("e.g. Calgary or T2P 1J9", function (val) {
            addMsg(escapeHtml(val), "user");
            botSay(
              [
                "Thanks! In the live version I'd show dentists near <strong>" +
                  escapeHtml(val) +
                  "</strong> who are accepting new patients.",
                "Can I send you the matches and a short eligibility summary by email? (You can unsubscribe anytime.)"
              ],
              function () {
                emailPrompt();
              }
            );
          });
        }
      );
    } else if (p.type === "email") {
      addMsg(p.label, "user");
      botSay(["Sure — what's the best email to reach you?"], function () {
        emailPrompt();
      });
    }
  }

  function textPrompt(placeholder, cb) {
    clearInput();
    var row = document.createElement("div");
    row.className = "text-row";
    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = placeholder;
    var send = document.createElement("button");
    send.className = "btn btn-primary";
    send.type = "button";
    send.textContent = "Send";
    function submit() {
      var v = input.value.trim();
      if (!v) return;
      clearInput();
      cb(v);
    }
    send.onclick = submit;
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") submit();
    });
    row.appendChild(input);
    row.appendChild(send);
    inputArea.appendChild(row);
    input.focus();
  }

  function emailPrompt() {
    clearInput();
    var row = document.createElement("div");
    row.className = "text-row";
    var input = document.createElement("input");
    input.type = "email";
    input.placeholder = "you@email.com";
    var send = document.createElement("button");
    send.className = "btn btn-primary";
    send.type = "button";
    send.textContent = "Send";
    function submit() {
      var v = input.value.trim();
      if (!v || v.indexOf("@") < 0) {
        input.style.borderColor = "#d66";
        return;
      }
      clearInput();
      addMsg(escapeHtml(v), "user");
      botSay(
        [
          "✓ Perfect — you're all set. (This is a prototype, so nothing is actually stored or sent yet.)",
          "When this is live, you'd get your dentist matches here, plus a plain-language summary of your CDCP benefits. Thanks for trying CDCP Guide! 🦷"
        ],
        function () {
          addRestartHint();
        }
      );
    }
    send.onclick = submit;
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") submit();
    });
    row.appendChild(input);
    row.appendChild(send);
    inputArea.appendChild(row);
    input.focus();
  }

  function addRestartHint() {
    var b = document.createElement("button");
    b.className = "choice-btn";
    b.type = "button";
    b.textContent = "↺ Start over";
    b.onclick = start;
    inputArea.appendChild(b);
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function start() {
    log.innerHTML = "";
    clearInput();
    go("intro");
  }

  document.getElementById("restart").onclick = start;
  start();
})();
