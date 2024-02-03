import { useState } from "react";
import classes from "./ToDoItem.module.scss";

type ToDoItemProps = {
  id: number;
  text: string;
  status: boolean;
  changeStatus: (id: number, status: boolean) => void;
  deleteTodo: (id: number) => void;
  changeText: (id: number, text: string) => void;
};

export const ToDoItem: React.FC<ToDoItemProps> = ({
  id,
  text,
  status,
  changeStatus,
  deleteTodo,
  changeText,
}) => {
  const [changeTextinput, setchangeTextinput] = useState<string>(text);
  const [isChanging, setisChanging] = useState<boolean>(false);
  return (
    <div className={classes.ToDoItem}>
      {isChanging ? (
        <input
          type="text"
          value={changeTextinput}
          onChange={(e) => setchangeTextinput(e.target.value)}
          className={classes.ToDoItem__Input}
        />
      ) : (
        <p className={classes.ToDoItem__h3}>{text}</p>
      )}
      <span className={classes.ToDoItem__ActionsBox}>
        {isChanging ? (
          <>
            <img
              src="./imgs/X.svg"
              alt="accept"
              width={17}
              height={17}
              onClick={() => {
                setchangeTextinput(text);
                setisChanging(false);
              }}
              className={classes.ToDoItem__Delete}
            />
            <img
              src="./imgs/done.svg"
              alt="cancel"
              width={20}
              height={20}
              onClick={() => {
                changeText(id, changeTextinput);
                setisChanging(false);
              }}
              className={classes.ToDoItem__Delete}
            />
          </>
        ) : (
          <>
            <img
              src="./imgs/Trash.svg"
              alt="delete"
              width={20}
              height={20}
              onClick={() => deleteTodo(id)}
              className={classes.ToDoItem__Delete}
            />
            <img
              src="./imgs/change.svg"
              alt="change"
              width={20}
              height={20}
              className={classes.ToDoItem__Delete}
              onClick={() => setisChanging(true)}
            />
            <input
              type="checkbox"
              checked={status}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                changeStatus(id, e.target.checked)
              }
              className={classes.ToDoItem__checkbox}
            />
          </>
        )}
      </span>
    </div>
  );
};
