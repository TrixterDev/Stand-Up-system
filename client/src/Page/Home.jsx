import Cookie from "js-cookie";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      Home
      <button
        onClick={() => {
          Cookie.remove("key");
          navigate("/auth");
        }}
      >
        exit
      </button>
    </div>
  );
};

export default Home;
