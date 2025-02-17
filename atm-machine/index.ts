const atmMachine = new Map<number, [string, number]>([
  [500, ["bill", 2]],
  [200, ["bill", 3]],
  [100, ["bill", 5]],
  [50, ["bill", 12]],
  [20, ["bill", 20]],
  [10, ["bill", 50]],
  [5, ["bill", 100]],
  [2, ["coin", 250]],
  [1, ["coin", 500]],
]);

function AtmMachine(label: string, atmMachine: Map<number, [string, number]>) {
  let output = `\r\n${label}\r\n`;

  for (const [value, [type, available]] of atmMachine.entries()) {
    output += `\r\n${value}\t${type}\t${available}`;
  }

  return output.concat("\r\n");
}

function report(amount: number, atmMachine: Map<number, [string, number]>) {
  console.log(`User requested $${amount}...`);

  try {
    const { breakdown, atm } = withdraw(amount, atmMachine);

    console.log(AtmMachine("initial", atmMachine));
    console.log(breakdown.join("\r\n"));
    console.log(AtmMachine("final", atm));
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    } else console.log("Sorry, we don't have the currency for that request");
  }
}

function withdraw(amount: number, atmMachine: Map<number, [string, number]>) {
  const breakdown: string[] = [];
  const atm = new Map(Array.from(atmMachine));
  let remaining = amount;

  for (const [value, [type, available]] of atm.entries()) {
    if (value <= remaining && available > 0) {
      const quantity = Math.min(available, Math.floor(remaining / value));

      remaining -= quantity * value;

      breakdown.push(
        `${quantity} ${type}${quantity > 1 ? "s" : ""} of ${value}.`
      );

      atm.set(value, [type, available - quantity]);
    }
  }

  if (remaining > 0)
    throw new Error("The ATM machine cannot satisfy your request");

  return { breakdown, atm };
}

report(434, atmMachine);
report(1735, atmMachine);
report(1825, atmMachine);
report(5101, atmMachine);
