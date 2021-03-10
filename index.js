const prompts = require("prompts");
const { exec } = require("child_process");
const { mkdir } = require("fs");

const getName = async () => {
  return await prompts({
    type: "text",
    name: "value",
    message: "What's the project name?",
  });
};

const handleTemplate = (name, template) => {
  mkdir(`./${name}`, { recursive: true }, (err) => {
    if (err) throw err;
  });

  exec(
    `git clone git@github.com:tejasag/${template} ${name}`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Done!");
    }
  );
};

const getTemplate = async () => {
  return await prompts({
    type: "select",
    name: "value",
    message: "Pick a template",
    choices: [
      {
        title: "React Typescript",
        value: "react-typescript-template",
      },
      {
        title: "React Typescript Sass",
        value: "react-typescript-sass-template",
      },
      {
        title: "React Typescript Sass Redux",
        value: "react-typescript-sass-redux-template",
      },
      {
        title: "React Typescript Sass Redux Apollo",
        value: "react-typescript-sass-redux-apollo-template",
      },
    ],

    initial: 1,
  });
};

(async () => {
  const name = await getName();
  const template = await getTemplate();
  await handleTemplate(name.value, template.value);
})();
