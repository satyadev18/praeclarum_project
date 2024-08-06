import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteEvent } from "../../redux/slice/eventSlice";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { getEventList } from "../../redux/slice/eventSlice";
import "./table.css";
import { useNavigate } from "react-router-dom";
const EventTable: React.FC = () => {
  const events = useSelector(getEventList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [open, setOpen] = useState(false);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (event.target.checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    selectedIds.forEach((id) => {
      dispatch(deleteEvent(id));
    });
    setSelectedIds([]);
    handleClose();
  };

  const handleEditClick = (id: number) => {
    navigate(`/event/${id}`);
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpen}
          disabled={selectedIds.length === 0}
          style={{ marginBottom: "16px" }}
          startIcon={<DeleteIcon />}
        >
          Delete Selected
        </Button>
      </Box>

      <TableContainer component={Box} sx={{ boxShadow: 3, borderRadius: 1 }}>
        <Table>
          <TableHead>
            <TableRow className="tableHead">
              <TableCell color="#f1eded" className="tableHeadCell">
                Select
              </TableCell>
              <TableCell className="tableHeadCell">ID</TableCell>
              <TableCell className="tableHeadCell">Event Name</TableCell>
              <TableCell className="tableHeadCell">Event Type</TableCell>
              <TableCell className="tableHeadCell">Start Date</TableCell>
              <TableCell className="tableHeadCell">End Date</TableCell>
              <TableCell className="tableHeadCell">Description</TableCell>
              <TableCell className="tableHeadCell">Handled By</TableCell>
              <TableCell className="tableHeadCell">Organisation</TableCell>
              <TableCell className="tableHeadCell">Sub-events</TableCell>
              <TableCell className="tableHeadCell">Edit</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {events.map((event: any, index: number) => (
              <TableRow
                key={index}
                className={`${index % 2 === 0 ? "" : "evenRow"}`}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(index)}
                    onChange={(e) => handleCheckboxChange(e, index)}
                  />
                </TableCell>
                <TableCell className="tableCell">{index + 1}</TableCell>
                <TableCell className="tableCell">{event.name}</TableCell>
                <TableCell className="tableCell">{event.type}</TableCell>
                <TableCell className="tableCell">
                  {event.startDate
                    ? dayjs(event.startDate).format("YYYY-MM-DD")
                    : "NA"}
                </TableCell>
                <TableCell className="tableCell">
                  {event.endDate
                    ? dayjs(event.endDate).format("YYYY-MM-DD")
                    : "NA"}
                </TableCell>
                <TableCell className="tableCell">{event.description}</TableCell>
                <TableCell className="tableCell">{event.handledBy}</TableCell>
                <TableCell className="tableCell">
                  {event.organisation}
                </TableCell>
                <TableCell className="tableCell">{event.subEvents}</TableCell>
                <TableCell
                  onClick={() => handleEditClick(event.id)}
                  className="tableCell cursorPointer"
                >
                  <ModeEditIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {events.length === 0 && (
        <Typography textAlign={"center"} mt={2}>
          No Event Found
        </Typography>
      )}

      <DeleteConfirmationModal
        open={open}
        onClose={handleClose}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default EventTable;
