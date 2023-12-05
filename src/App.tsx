import React, { ReactNode, isValidElement, useState } from "react";
import style from './style.module.scss'
import { store } from "./store";
import { Provider } from 'react-redux'

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
    children.forEach((elem) => {
      if (isValidElement(elem) && typeof elem?.type === "function") {
        switch (elem.type.name) {
          case AccordionHeader.name:
            header = elem;
            break;
          case AccordionBody.name:
            body = elem;
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

  const rows = [
    {
      value: ['1', '2', '3', '4', '5']
    },
    {
      value: ['1', '2', '3', '4', '5']
    },
    {
      value: ['1', '2', '3', '4', '5']
    },
    {
      value: ['1', '2', '3', '4', '5']
    }
]

  return (
    <Provider store={store}>
      <Accordion>
        <AccordionHeader>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p>some text accordion</p>
          <input />
          <input />
          <input />
          <input />
          <input />
          </div>
        </AccordionHeader>
        <AccordionBody>
          <ul style={{ marginLeft: 140, display: 'flex', flexDirection: 'column' }}>
            {rows.map((value, index) => (
              <li style={{ listStyle: 'none', display: 'flex', flexDirection: 'row' }} key={index}>
                {
                  value.value.map((elem, index) => 
                    <input key={index} defaultValue={elem} />
                  )
                }
              </li>
            ))}
          </ul>
        </AccordionBody>
      </Accordion>
      </Provider>
  );
}

export default App;
