import classes from "./App.module.scss";

import { useEffect, useMemo, useState } from "react";
import { IToDo } from "./types/models/IToDo";
import { ToDoItem } from "./ToDoItem";

function App() {
  const [ToDoList, setToDoList] = useState<IToDo[]>([]);
  const [addToDoinputValue, setaddToDoinputValue] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  const activeToDo: IToDo[] = useMemo(() => {
    if (filter === "active") return ToDoList.filter((item) => item.status);
    if (filter === "inactive") return ToDoList.filter((item) => !item.status);
    else return ToDoList;
  }, [ToDoList, filter]);

  const changeText = (id: number, text: string) => {
    if (text) {
      setToDoList(
        ToDoList.map((item) => {
          if (item.id === id)
            return {
              id: item.id,
              text: text,
              status: item.status,
            };
          return item;
        }),
      );
    } else return;
  };
  const AddToDo = (text: string) => {
    if (text) {
      setaddToDoinputValue("");
      setToDoList([
        ...ToDoList,
        {
          id: ToDoList[ToDoList.length - 1]?.id + 1 || 0,
          text: text,
          status: false,
        },
      ]);
    } else return;
  };
  const changeStatus = (id: number, status: boolean) => {
    setToDoList(
      ToDoList.map((item) => {
        if (item.id === id)
          return {
            id: item.id,
            text: item.text,
            status: status,
          };
        return item;
      }),
    );
  };
  const DeleteToDo = (id: number) => {
    setToDoList(ToDoList.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const toDolistInStore: IToDo[] | null = JSON.parse(
      localStorage.getItem("todoList") || "null",
    );
    if (toDolistInStore)
      if (toDolistInStore.length) setToDoList(toDolistInStore);
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(ToDoList));
  }, [ToDoList]);
  return (
    <div className="App">
      <section className={classes.AddToDo}>
        <h1 className={classes.AddToDo__h1}>Що робимо сьогодні?</h1>
        <form className={classes.AddToDo__Form}>
          <span className={classes.AddToDo__InputBox}>
            <input
              type="text"
              value={addToDoinputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setaddToDoinputValue(e.target.value)
              }
              className={classes.AddToDo__Input}
              placeholder="Add to Do...."
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                AddToDo(addToDoinputValue);
              }}
              className={classes.AddToDo__Btn}
            >
              {" "}
              <img
                src="./imgs/addbtn.svg"
                alt="btnImg"
                width={20}
                height={20}
              />
            </button>
          </span>
        </form>
      </section>
      <section>
        <div className={classes.fitlers}>
          <ul className={classes.fitlers__ul}>
            <li
              className={classes.fitlers__li}
              onClick={() => setFilter("")}
              style={{ color: `${filter === "" ? "green" : "black"}` }}
            >
              All
            </li>
            <li
              className={classes.fitlers__li}
              onClick={() => setFilter("active")}
              style={{ color: `${filter === "active" ? "green" : "black"}` }}
            >
              Done
            </li>
            <li
              className={classes.fitlers__li}
              onClick={() => setFilter("inactive")}
              style={{ color: `${filter === "inactive" ? "green" : "black"}` }}
            >
              Undone
            </li>
          </ul>
        </div>
        <div className={classes.todoBox}>
          {activeToDo.map((item) => (
            <ToDoItem
              text={item.text}
              status={item.status}
              changeStatus={changeStatus}
              deleteTodo={DeleteToDo}
              changeText={changeText}
              key={item.id}
              id={item.id}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
