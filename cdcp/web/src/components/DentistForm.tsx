"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

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
