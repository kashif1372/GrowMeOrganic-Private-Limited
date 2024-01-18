import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Component1 from "../../assets/components/component1/component1";
import Component2 from "../../assets/components/component2/Component2";

export function Home() {
  const user = localStorage.getItem("user");
  console.log(localStorage.getItem("user"));
  const Navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      Navigate("/");
    }
  }, []);

  return (
    <>
      {user && (
        <div>
          <h1>Assignment by Kashif Sheikh</h1>
          <Component1 />
          <hr />
          <Component2 />
        </div>
      )}
    </>
  );
}

