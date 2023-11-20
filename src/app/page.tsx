import { Box, Button, Card, Container, Typography } from '@mui/material'

export default function Home() {
  return (
    <main>
      <Container className="m-16">
        <Box>
          <Card>
            <Typography variant="h2">Hello World</Typography>
          </Card>
        </Box>
        <br />
        <Button variant="contained">Hello</Button>
      </Container>
    </main>
  )
}
