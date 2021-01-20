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
import {ShoppingBasket} from "@material-ui/icons";

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

  const [totalCustomersResponse, setTotalCustomersResponse] = useState<TotalCustomersResponse>({
     newUsersThisMonth : 0,
    total : 0
  })

  useEffect(()=>{
    fetchTotalCustomers().then(data=>{
      setTotalCustomersResponse(data)
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
              TOTAL PRODUCTS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {totalCustomersResponse.total}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <ShoppingBasket />
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
            Currently available on the website
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
