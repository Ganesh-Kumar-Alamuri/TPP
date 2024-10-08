import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
const ProtectedRoute = ({ children, user, setUser }) => {
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (!token) navigate("/login");
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://tpp-backend-3f7y.onrender.com/api/v1/status",
          {
            headers: {
              authorization: token,
            },
          }
        );

        setUser({
          userMail: res.data.userMail,
          employeeType: res.data.employeeType,
          userid: res.data.userid,
          username: res.data.username,
        });
        setCheck(true);
      } catch (error) {
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate, setUser]);
  if (check || user) {
    return children;
  } else {
    navigate("/login");
  }
};

export default ProtectedRoute;
