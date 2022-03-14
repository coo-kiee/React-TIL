import React from "react";

const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
        // 프린트 될 컴포넌트 - 보여주고 싶지 않으면 display: "none" - https://www.npmjs.com/package/react-to-print
        <div ref={ref}>
            My cool content here!
        </div>
     );
});
 
export default ComponentToPrint;