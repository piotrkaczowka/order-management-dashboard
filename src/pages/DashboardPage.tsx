import { Box, Container } from '@mui/material'

import SummaryStats from '../features/dashboard/components/SummaryStats'
import ErrorBoundary from '../shared/components/ErrorBoundary'

const DashboardPage = () => (
  <Container maxWidth="lg">
    <Box sx={{ py: 4 }}>
      <ErrorBoundary>
        <SummaryStats />
      </ErrorBoundary>
    </Box>
  </Container>
)

export default DashboardPage
