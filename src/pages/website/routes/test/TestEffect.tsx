import { moduleEffect } from "@/queenjs/framework";
import { defineComponent, reactive, computed } from "vue";

export default defineComponent(() => {
  const state: any = reactive({
    user: {
      name: "",
      phone: 18981937200,
      url: "xxxx",
    },
    projects: [
      {
        id: 1,
        name: "No.0",
      },
    ],

    lastItem: computed(() => {
      return state.projects[state.projects.length - 1];
    }),
  });

  const effectCtrl = moduleEffect(() => state.user)
    .item(
      (item) => item.name,
      (item) => console.log(item.name)
    )
    .item(
      (item) => item.phone,
      (item) => console.log("update phone", item.phone)
    )
    .run();

  const effectCtrl2 = moduleEffect(() => state.projects)
    .list({
      add(item) {
        console.log("add item", item);
      },
      remove(item) {
        console.log("remove item", item);
      },
    })
    .item(
      (item) => item.name,
      (item) => console.log(item.name)
    )
    .run();

  return () => (
    <div>
      <div>
        {/* <button
          onClick={() => {
            state.user.name = Date.now().toString();
          }}
        >
          update name
        </button>
        <button
          onClick={() => {
            state.user.phone = Math.random();
          }}
        >
          update phone
        </button>
        <button
          onClick={() => {
            effectCtrl.run();
          }}
        >
          run
        </button>
        <button
          onClick={() => {
            effectCtrl.stop();
          }}
        >
          stop
        </button>
        */}
      </div>
      <div>
        <button
          onClick={() => {
            state.projects.push({
              id: Date.now(),
              name: `No.${state.projects.length}`,
            });
          }}
        >
          add
        </button>
        <button
          onClick={() => {
            state.projects.pop();
          }}
        >
          删除最后
        </button>
        <button
          onClick={() => {
            state.projects.shift();
          }}
        >
          删除第一个
        </button>
        <button
          onClick={() => {
            effectCtrl2.run();
          }}
        >
          run
        </button>
        <button
          onClick={() => {
            effectCtrl2.stop();
          }}
        >
          stop
        </button>
        <button
          onClick={() => {
            effectCtrl2.pause();
          }}
        >
          pause
        </button>
        <button
          onClick={() => {
            effectCtrl2.play();
          }}
        >
          play
        </button>
        <button
          onClick={() => {
            effectCtrl2.pause();
            state.lastItem.name = Math.random().toString();
            effectCtrl2.play();
          }}
        >
          changeName
        </button>
      </div>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
});
