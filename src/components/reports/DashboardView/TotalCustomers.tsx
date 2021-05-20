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
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import {fetchTotalCustomers, TotalCustomersResponse} from "../../../repositories/AnalyticsRepository";
import {errorState, instanceOfSuccess, successState, useRequestState} from "../../../utils/State";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  }
}));

const TotalCustomers = () => {
  const classes = useStyles();

  const [totalCustomersResponse, setTotalCustomersResponse] = useRequestState<TotalCustomersResponse>()

  useEffect(()=>{
    fetchTotalCustomers().then((response)=>{
      setTotalCustomersResponse(successState(response.data))
    }).catch(error=>{
        setTotalCustomersResponse(errorState(error))
    })
  },[])

  return (
    <Card>
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
              TOTAL CUSTOMERS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {
                instanceOfSuccess(totalCustomersResponse) && totalCustomersResponse.data.total
              }
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            { instanceOfSuccess(totalCustomersResponse) && totalCustomersResponse.data.newUsersThisMonth}
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            New Customers in the last 30 days
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

TotalCustomers.propTypes = {
  className: PropTypes.string
};

export default TotalCustomers;
