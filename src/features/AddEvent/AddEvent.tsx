import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import {
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  Box,
  Typography,
  Dialog,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import * as Yup from "yup";
import FieldInput from "../../components/FieldInput";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  addEvent,
  getEventList,
  updateEvent,
} from "../../redux/slice/eventSlice";
import { useParams } from "react-router-dom";
import { requiredCharField } from "../../utils/validations";

interface EventFormValues {
  id?: number;
  name: string;
  type: string;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  description: string;
  handledBy: string;
  organisation: string;
  subEvents: number;
}

interface Properties {
  isEdit: boolean;
}

const validationSchema = Yup.object({
  name: requiredCharField("Event Name"),
  type: requiredCharField("Event Type"),

  description: requiredCharField("Event Description"),
  handledBy: requiredCharField("Handle By"),
  organisation: requiredCharField("Organisation"),
  subEvents: Yup.number().required("Total Sub event").positive().integer(),
});

const AddEvent = ({ isEdit }: Properties) => {
  const dispatch = useDispatch();
  const eventList = useSelector(getEventList);
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState<EventFormValues>({
    name: "",
    type: "",
    startDate: null,
    endDate: null,
    description: "",
    handledBy: "",
    organisation: "",
    subEvents: 0,
  });
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = (
    values: EventFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    setSuccessOpen(true);

    if (isEdit) {
      dispatch(updateEvent(values));
      setInitialValues(values);
    } else {
      values.id = eventList.length;
      dispatch(addEvent(values));
      resetForm();
    }

    setTimeout(() => {
      setSuccessOpen(false);
    }, 1000);
  };

  useEffect(() => {
    if (isEdit) {
      const data = eventList.find((event: any) => event.id === Number(id));

      if (data) {
        setInitialValues(data);
      }
    }
  }, [isEdit, eventList, id]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={3}>
      <Typography sx={{ textAlign: "center" }} variant="h4">
        {isEdit ? "Update Event" : "Add Event"}
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FieldInput
                  label="Event Name"
                  name="name"
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FieldInput
                  label="Event Description"
                  name="description"
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FieldInput
                  label="Handled By"
                  name="handledBy"
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FieldInput
                  label="Organisation"
                  name="organisation"
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FieldInput
                  label="Total Sub-events"
                  name="subEvents"
                  type="number"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    fontSize: "16px",
                  }}
                >
                  Event Type <span className="text-danger"> *</span>
                </InputLabel>
                <FormControl
                  fullWidth
                  error={Boolean(errors.type && touched.type)}
                >
                  <Select
                    name="type"
                    value={values.type}
                    onChange={(e) => setFieldValue("type", e.target.value)}
                  >
                    <MenuItem value="sports">Sports</MenuItem>
                    <MenuItem value="music">Music</MenuItem>
                    <MenuItem value="general">General</MenuItem>
                    <MenuItem value="children">Children</MenuItem>
                    <MenuItem value="school">School</MenuItem>
                  </Select>
                  <FormHelperText
                    sx={{
                      mb: 1,
                      fontSize: "16px",
                    }}
                  >
                    {touched.type ? errors.type : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    fontSize: "16px",
                  }}
                >
                  Start Date
                </InputLabel>
                <DatePicker
                  value={values.startDate}
                  onChange={(date) => setFieldValue("startDate", date)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    fontSize: "16px",
                  }}
                >
                  End Date
                </InputLabel>
                <DatePicker
                  value={values.endDate}
                  onChange={(date) => setFieldValue("endDate", date)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      <Dialog
        sx={{ padding: 4 }}
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
      >
        <Box
          sx={{
            width: "200px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Box
            sx={{
              width: "80px",
              height: "80px",
              backgroundColor: "primary.main",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DoneAllIcon sx={{ color: "white", fontSize: "40px" }} />
          </Box>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "text.secondary",
              fontSize: "24px",
            }}
          >
            {isEdit ? "Event Updated!" : "Event Added"}
          </Typography>
        </Box>
      </Dialog>
    </Box>
  );
};

export default AddEvent;
