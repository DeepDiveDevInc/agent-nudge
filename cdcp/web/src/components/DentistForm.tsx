"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

/** Dentist-side lead form (prototype — submission is not yet wired to a backend). */
export default function DentistForm({ dict }: { dict: Dictionary }) {
  const d = dict.dentistSection;
  const [done, setDone] = useState(false);
  return (
    <div className="dentist-form-card" id="dentist-form">
      <h3>{d.formTitle}</h3>
      <p className="micro">{d.formMicro}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // TODO(next phase): POST practice/name/email/interest to a lead endpoint + CRM, and only
          // show the success state on a 2xx response (with error handling). Intentionally a no-op
          // prototype for now — see cdcp/web/README.md "Production TODO".
          (e.target as HTMLFormElement).reset();
          setDone(true);
        }}
      >
        <input type="text" placeholder={d.fields.practice} required />
        <input type="text" placeholder={d.fields.name} required />
        <input type="email" placeholder={d.fields.email} required />
        <select required defaultValue="">
          <option value="" disabled>
            {d.interest.label}
          </option>
          <option>{d.interest.advisory}</option>
          <option>{d.interest.enroll}</option>
          <option>{d.interest.listing}</option>
          <option>{d.interest.all}</option>
        </select>
        <button className="btn btn-primary btn-block" type="submit">
          {d.submit}
        </button>
        {done && <p className="form-done">{d.done}</p>}
      </form>
    </div>
  );
}
