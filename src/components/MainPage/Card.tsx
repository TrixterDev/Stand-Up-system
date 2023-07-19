import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import st from "./MainPage.module.sass";
import React, { useEffect, useState } from "react";
import { changeData, getUserInfo } from "../../api";
import { Loader } from "../ui/Loader";
import { format } from "date-fns";
import { Button, CardActions, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface props {
  id: number;
  productInfo: questionItem;
  category_id: number;
  userId: number;
}

interface itemKeys {
  title: string;
  answer: string;
  category_id: number;
  id: number;
  userId: number;
  createdDate: string;
}
const CardUi: React.FC<props> = ({ productInfo, userId, id, category_id }) => {
  const [item, setItem] = useState<itemKeys>({
    title: productInfo.title,
    answer: "",
    id: id,
    category_id: category_id,
    userId: userId,
    createdDate: "",
  });

  const [loader, setLoader] = useState<boolean>(true);

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoader(true);
    console.log(item.title);
    const currentDate = format(new Date(), "yyyy-MM-dd");
    changeData(item, userId, currentDate).then((el) => {
      setLoader(false);
      setSubmitted(true);
    });
  };

  useEffect(() => {
    getUserInfo().then((resp: any) => {
      setLoader(false);

      resp.otveties.forEach((item: any) => {
        if (id === item.question?.id) {
          setSubmitted(true);
          setItem((prev) => {
            return { ...prev, answer: item.answer };
          });
        }
      });
    });
  }, []);

  if (loader) {
    return (
      <div
        className={st.grid_item}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div key={item?.id}>
      <form onSubmit={handleSubmit}>
        {submitted ? (
          <Card sx={{ minWidth: 275 }} className={st.doneAns}>
            <CardContent className={st.doneAns__title}>
              <h3>Ответ отправлен. Спасибо! </h3>
            </CardContent>
            <CardActions className={st.doneAns__desc}>
              <p>Ваш ответ: {item.answer}</p>
            </CardActions>
          </Card>
        ) : (
          <Accordion className={st.card}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                style={{ borderColor: "#fff" }}
                className={st.input_style}
                type="number"
                name="answer"
                value={item.answer}
                onChange={(e) => setItem({ ...item, answer: e.target.value })}
                fullWidth
                variant="standard"
                id="fullWidth"
                label="Ответ"
                // InputLabelProps={{
                //   shrink: true,
                // }}
              />

              <Button
                className={st.btn}
                variant="contained"
                fullWidth
                type="submit"
              >
                Ответить
              </Button>
            </AccordionDetails>
          </Accordion>
        )}
      </form>
    </div>
  );
};

export default CardUi;
