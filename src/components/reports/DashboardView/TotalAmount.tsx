import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import {fetchTotalAmount, fetchTotalCustomers} from "../../../repositories/AnalyticsRepository";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const TotalAmount = () => {
  const classes = useStyles();

  const [totalAmount,setTotalAmount] = useState(0)

  useEffect(()=>{
        fetchTotalAmount().then(result=>{
            setTotalAmount(result.total)
        })
  },[])

  return (
    <Card
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
             TOTAL AMOUNT
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {"£" +totalAmount}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <Typography
            color="textSecondary"
            variant="caption"
          >
            In the last 30 days
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

TotalAmount.propTypes = {
  className: PropTypes.string
};

export default TotalAmount;
