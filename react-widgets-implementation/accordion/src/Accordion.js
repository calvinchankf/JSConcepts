import { useState } from "react";

export default function Accordion({ objs }) {
  const [selecteds, setSelecteds] = useState(new Set());

  const arrowOnClickHandler = (i) => {
    setSelecteds((state) => {
      const nextState = new Set(state); // copy current state
      if (nextState.has(i)) {
        nextState.delete(i); // collapse if open
      } else {
        nextState.add(i); // expand if closed
      }
      return nextState;
    })
  }

  return (
    <>
      {objs.map((obj, i) => {
        
        let accordionIconClassName = "accordion-icon"
        if (selecteds.has(i)) {
          accordionIconClassName += ' accordion-icon--rotated'
        }

        return (
          <div key={i}>
            <div onClick={() => arrowOnClickHandler(i)}>
              {obj.title}{' '}
              <div
                aria-hidden={true}
                className={accordionIconClassName}
              />
            </div>
            <div
              style={{ display: selecteds.has(i) ? "block" : "none" }}
            >{obj.desc}</div>
          </div>
        )
      })}
    </>
  );
}
