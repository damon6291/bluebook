import { Helmet } from "react-helmet-async";
import { Container } from "@mui/material";
import ProfileView from "src/sections/Profile/profileView";

export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title> Profile </title>
      </Helmet>
      <Container sx={{ mt: 10 }}>
        <ProfileView />
      </Container>
    </>
  );
}
