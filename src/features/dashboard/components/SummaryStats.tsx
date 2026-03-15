import { AttachMoney, Inventory, Public } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'

import { useDashboardMetrics } from '../hooks/useDashboardMetrics'
import MetricsCard from './MetricsCard'

const SummaryStats = () => {
  const { totalOrders, totalPrice, uniqueCountries } = useDashboardMetrics()

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Overview
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <MetricsCard
            title="Total Orders"
            value={totalOrders}
            Icon={Inventory}
            color="primary.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <MetricsCard
            title="Total Revenue"
            value={totalPrice}
            Icon={AttachMoney}
            color="secondary.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <MetricsCard
            title="Countries Served"
            value={uniqueCountries}
            Icon={Public}
            color="warning.main"
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SummaryStats
