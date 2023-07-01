import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  GetloginUser,
  changeUserInfo,
  changeUserOnline,
  getCategories,
  getData,
  getUserInfo,
  getUsers,
} from "../../api";
import Input from "../ui/Input/Input";
import { Modal } from "../ui/Modal";
import Card from "./Card";
import st from "./MainPage.module.sass";
import Select from "../ui/Select";
import { BiExit } from "react-icons/bi";
import { CgOptions } from "react-icons/cg";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

interface QuestionItem {
  answer: string;
  question: string;
  id: number;
  title: string;
  category?: any;
}

interface FormKeys {
  about: string;
}

interface props {
  id: number;
}

const MainPage: React.FC<props> = ({ id }) => {
  const navigate = useNavigate();

  const [offline, setOffline] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  const [xz, setXz] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [loginUser, setLoginUser] = useState<any>(null);
  const [dataUser, setDataUser] = useState<any>(null);

  const [form, setForm] = useState<FormKeys>({
    about: "",
  });

  const status = {
    online: false,
  };

  console.log(id);

  useEffect(() => {
    const key = Cookies.get("key");
    if (key !== undefined) {
      getUserInfo().then((response: any) => {
        setDataUser(response);
        setData(
          response.access_questions.map((item) => {
            return { ...item, category: item.category.id };
          })
        );

        if (response.about === "" || response.about === null) {
          setShowModal(true);
        }
      });
    }

    // getData().then((res: any) => {
    //   setData(res.data);
    // });

    getUsers().then((res: any) => {
      const filteredUsers = res.filter(
        (user: any) => user.access_questions !== null
      );
      setUsers(filteredUsers);
      const offlineUsers = filteredUsers.filter((user: any) => !user.online);
      setOffline(offlineUsers);
    });

    getCategories().then((xz: any) => {
      setXz(xz.data);
    });
  }, []);

  console.log(dataUser);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    GetloginUser(Cookies.get("key"), form.about, dataUser?.id).then(
      (el: any) => {
        setLoginUser(el);
      }
    );
    setShowModal(false);
    // Rest of the code...
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={st.wrap}>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <form onSubmit={handleSubmit} className={st.modal_text}>
          <span>tell me about you</span>
          <Input name="about" idElem="about" onChange={handleInput} required />
          <button>send</button>
        </form>
        <button onClick={() => setShowModal(false)}>skip</button>
      </Modal>
      <div className={st.auth}>
        {/* <Select
          title={dataUser?.username}
          src="./img/base-avatar.png"
          top={"70px"}
        >
          <h4
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid white",
            }}
            onClick={() => {
              navigate("/user-page");
            }}
          >
            <CgOptions size={"30px"} /> Настройки
          </h4>
          <h4
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid white",
              width: "135px",
              gap: "5px",
            }}
            onClick={() => {
              changeUserOnline(status, Number(Cookies.get("idUser")));
              Cookies.remove("key");
              Cookies.remove("role");
              navigate("/");
            }}
          >
            <BiExit size={"30px"} /> Выход
          </h4>
        </Select> */}
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title={dataUser && dataUser.username}>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <img
                src={
                  dataUser || dataUser?.avatarka
                    ? dataUser.avatarka.url
                    : "./img/base-avatar.png"
                }
                style={{ width: "65px", height: "65px", borderRadius: "100%" }}
                alt=""
              />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={() => {
              navigate("/user-page");
            }}
          >
            <img
              src={
                dataUser?.avatarka
                  ? dataUser.avatarka.url
                  : "./img/base-avatar.png"
              }
              style={{ width: "25px", height: "25px", borderRadius: "100%" }}
              alt=""
            />{" "}
            <p>{dataUser && dataUser.username}</p>
          </MenuItem>
          <Divider />
          <MenuItem
            // onClick={handleClose}
            onClick={() => {
              changeUserOnline(status, Number(Cookies.get("idUser")));
              Cookies.remove("key");
              Cookies.remove("role");
              navigate("/");
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
      <div className={st.grid_container}>
        {data.map(
          (el: { id: number; attributes: QuestionItem }, index: number) => {
            console.log(el);
            const categoryID = el.category;
            return (
              <Card
                key={el.id}
                productInfo={el}
                id={el.id}
                userId={dataUser?.id}
                category_id={categoryID}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default MainPage;
