import { $ } from "bun";

const lessonsFile = Bun.argv[2];
if (!lessonsFile) {
  console.log("no lessons file provided");
  process.exit(1);
}

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

const fontList = (await $`figlist`.text())
  .split("Figlet control files in this directory:")[0]
  .split("Figlet fonts in this directory:")[1]
  .split("\n")
  .filter((x) => x !== "")
  .map((x) => x.trim());
const lessons = await $`cat ${lessonsFile}`.json();

await $`figlet -f ${rand(fontList)} ${rand(lessons)} | lolcat -f`;
