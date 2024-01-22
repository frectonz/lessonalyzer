import { $ } from "bun";

const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const figlist = await $`figlist`.text();

const fontList = figlist
  .split("Figlet control files in this directory:")[0]
  .split("Figlet fonts in this directory:")[1]
  .split("\n")
  .filter((x) => x !== "")
  .map((x) => x.trim());
const randomFont = randomElement(fontList);

const lessonsText = await $`cat lessons.json`.text();

const lessons = JSON.parse(lessonsText);
const randomLesson = randomElement(lessons);

await $`figlet -f ${randomFont} ${randomLesson} | lolcat -f`;
