import type { SvgIconComponent } from '@mui/icons-material'
import { Box, Card, CardContent, Typography } from '@mui/material'

interface Props {
  title: string
  value: string | number
  Icon: SvgIconComponent
  color?: string
}

const MetricsCard = ({ title, value, Icon, color = 'primary.main' }: Props) => (
  <Card elevation={2}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4">{value}</Typography>
        </Box>
        <Box
          sx={{
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon sx={{ color, fontSize: 28 }} />
        </Box>
      </Box>
    </CardContent>
  </Card>
)

export default MetricsCard
