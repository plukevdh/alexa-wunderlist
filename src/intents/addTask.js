export default function addTask(event) {
  const { app, client } = event;

  app.intent("AddTask", {
      slots: {
        TaskName: "TASK_NAME",
        ListName: "LIST_NAME",
        Date: "AMAZON.DATE",
        When: "AMAZON.DURATION"
      },
      utterances: [
        "{added|created} {TaskName} to {-|ListName} on {Date}"
      ]
    },
    function(request, response) {
      console.log(request);
      response.say("Will do!").send()
    });

  return app;
}


