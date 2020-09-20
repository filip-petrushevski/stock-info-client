import React from 'react';
import { Typography } from '@material-ui/core';

export default function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © StockInfo '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }