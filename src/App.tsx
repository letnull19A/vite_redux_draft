import { ReactNode, isValidElement, useState } from "react";
import style from './style.module.scss'
import { useAppDispatch, useAppSelector } from "./hooks";
import { addAccordion, addItem, handleEditField, toggleEditmode } from "./slice";

type AccordionProps = {
  children: ReactNode[];
};

type AccordionContent = {
  children: JSX.Element[] | JSX.Element;
};

const Accordion = (props: AccordionProps) => {
  const { children } = props;
  const [toggle, setToggle] = useState<boolean>(false);

  let header;
  let body;

  if (Array.isArray(children)) {
    children.forEach((element) => {
      if (isValidElement(element) && typeof element.type === "function") {
        switch (element.type.name) {
          case AccordionHeader.name:
            header = element;
            break;
          case AccordionBody.name:
            body = element;
            break;
          default:
            break;
        }
      }
    });
  }

  return (
    <div className={style.accordion}>
      <div className={style.accordion_header}>
        <button onClick={() => setToggle(prev => !prev)}>toggle</button>
        {header}
        </div>
      {toggle && <div>{body}</div>}
    </div>
  );
};

const AccordionHeader = (props: AccordionContent) => {
  return <div>{props.children}</div>;
};

const AccordionBody = (props: AccordionContent) => {
  return <div>{props.children}</div>;
};

function App() {

  const data = useAppSelector((state) => state.counter.dataSet)
  const dispatch = useAppDispatch()

  return (
    <>
      <button onClick={() => {dispatch(toggleEditmode())}}>edit mode {data.isEditMode ? 'on' : 'off'}</button>
      {data.dataSet.map((mark, index) => (
        <Accordion key={index + 92}>
          <AccordionHeader>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
            <p>some text accordion</p>
            <input readOnly value={mark && mark.reduce((acc, current) => acc + current['field1'] as number, 0).toString()}/>
            <input />
            <input />
            <input />
            </div>
          </AccordionHeader>
          <AccordionBody>
            <ul style={{ marginLeft: 140, display: 'flex', flexDirection: 'column' }}>
              {Array.isArray(mark) && mark.map((value, row) => (
                <li style={{ listStyle: 'none', display: 'flex', flexDirection: 'row' }} key={index}>
                  <input onChange={(e) => dispatch(handleEditField({
                    accordion: index,
                    row: row,
                    field: "field1",
                    value: Number.parseInt(e.target.value)
                  }))} key={index + 99} defaultValue={value.field1.toString()} />
                  <input onChange={(e) => dispatch(handleEditField({
                    accordion: index,
                    row: row,
                    field: "field2",
                    value: Number.parseInt(e.target.value)
                  }))} key={index + 34} defaultValue={value.field2.toString()} />
                  <input onChange={(e) => dispatch(handleEditField({
                    accordion: index,
                    row: row,
                    field: "field3",
                    value: Number.parseInt(e.target.value)
                  }))} key={index + 80} defaultValue={value.field3.toString()} />
                  <input onChange={(e) => dispatch(handleEditField({
                    accordion: index,
                    row: row,
                    field: "field4",
                    value: Number.parseInt(e.target.value)
                  }))} key={index} defaultValue={value.field4.toString()} />
                  {data.isEditMode && <input key={index + 78} type="checkbox"/>}
                </li>
              ))}
              <li style={{ listStyle: 'none' }}><button onClick={() => dispatch(addItem({index}))}>add item</button></li>
            </ul>
          </AccordionBody>
        </Accordion>
      ))}
      <button onClick={() => dispatch(addAccordion())}>add accordion</button>
    </>
  );
}

export default App;
