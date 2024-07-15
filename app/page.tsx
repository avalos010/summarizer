"use client";

import { summarize } from "./classify/pipeline";

export default async function Home() {
  const f = await summarize(
    "The case arose in 2008, when Otis McDonald, a retired African American custodian, and others filed suit in U.S. District Court to challenge provisions of a 1982 Chicago law that, among other things, generally banned the new registration of handguns and made registration a prerequisite of possession of a firearm. The next day the National Rifle Association and others filed separate lawsuits challenging the Chicago law and an Oak Park, Ill., law that generally prohibited the possession or carrying of handguns and the carrying of other firearms except rifles or shotguns in one’s home or place of business. Each suit alleged that the law violated the right of individuals to possess and carry weapons, which the Supreme Court had found to be protected by the Second Amendment in District of Columbia v. Heller (2008). (Anticipating this finding, the plaintiffs in McDonald v. City of Chicago filed suit on the same morning that the decision in Heller was announced.) The crucial question, however, was whether the Second Amendment is applicable to the states and their political subdivisions. Citing “selective incorporation,” the Supreme Court’s gradual application to the states of most of the protections of the Bill of Rights through the due process clause of the Fourteenth Amendment (which prohibits the states from denying life, liberty, or property without due process of law), the plaintiffs argued that the Second Amendment is applicable through that clause as well as through the amendment’s “privileges or immunities” clause (which forbids the states from abridging the privileges or immunities of citizens of the United States)."
  );

  console.log(f);
  return <div>TEST</div>;
}
