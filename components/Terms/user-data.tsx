import {
  Box,
  Link,
  List,
  ListItem,
  ListItemText,
  styled,
  Typography
} from "@mui/material";
import React from "react";
const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  lineHeight: 1.6,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
  width: "80%",
  margin: "0 auto",
  "& .MuiTypography-h5": {
    fontWeight: 700,
  },
  " .MuiTypography-h4": {
    fontWeight: 700,
    fontSize: "20px",
  },
  "& .MuiTypography-h6": {
    fontSize: "16px",
    fontWeight: 600,
  },
  "& .MuiTypography-body1": {
    padding: "5px 0",
  },
  "& .MuiListItem-root": {
    padding: "0 10px",
  },
}));
export default function Userdata() {
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <div>
      <StyledContainer>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontSize: { xs: "16px", sm: "20px" } }}
        >
          Data Deletion Instructions
        </Typography>

        <Typography variant="body1" paragraph sx={{ fontSize: "14px" }}>
          At PowerCozmo, your privacy and security are of the utmost importance
          to us. We are fully committed to protecting your personal data and
          ensuring your information is handled with the highest level of
          respect. We understand that sometimes you may want to delete your
          data, and we want to make the process as transparent and
          straightforward as possible.
        </Typography>

        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: { xs: "14px", sm: "16px" } }}
        >
          Why We Respect Your Privacy
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: "14px" }}>
          We believe that your data belongs to you.{" "}
          <strong>
            We do not retain your personal information longer than necessary
          </strong>
          , and we follow strict policies to safeguard your privacy.{" "}
          <strong>We want you to feel confident</strong> that your data is being
          handled securely and that we are always here to support you in any way
          we can.
        </Typography>

        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: { xs: "14px", sm: "16px" } }}
        >
          How to Request Data Deletion
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: "14px" }}>
          If you wish to delete your data from our system, please follow the
          steps outlined below. We have designed this process to be clear and
          efficient.
        </Typography>

        <List sx={{ marginBottom: 2 }}>
          <ListItem>
            <ListItemText
              primary={<strong>Email Your Request</strong>}
              secondary={
                <Typography variant="body2" sx={{ fontSize: "14px" }}>
                  Please send an email to{" "}
                  <Link href="mailto:info@powercozmo.com">
                    info@powercozmo.com
                  </Link>{" "}
                  with the subject line “<strong>Data Deletion Request</strong>
                  ”. In the body of your email, kindly provide the following
                  details:
                  <ul>
                    <li>
                      Your <strong>full name</strong>
                    </li>
                    <li>
                      The <strong>email address</strong> associated with your
                      account
                    </li>
                    <li>
                      A <strong>brief explanation</strong> of why you are
                      requesting the deletion of your data
                    </li>
                  </ul>
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<strong>Provide a Valid Reason</strong>}
              secondary={
                <Typography variant="body2" sx={{ fontSize: "14px" }}>
                  In order for us to process your request, we require a{" "}
                  <strong>valid reason</strong> for the deletion of your data.
                  We may ask for further clarification if needed.{" "}
                  <strong>
                    Rest assured, we evaluate each request carefully and
                    prioritize your privacy
                  </strong>
                  .
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<strong>Review and Processing</strong>}
              secondary={
                <Typography variant="body2" sx={{ fontSize: "14px" }}>
                  Once your request is received, we will assess the provided
                  reason for deletion.{" "}
                  <strong>
                    If the reason meets our privacy policy criteria
                  </strong>
                  , we will approve and process the deletion.{" "}
                  <strong>You will receive confirmation</strong> that your
                  request has been approved within 48 hours. In case the request
                  cannot be processed immediately, you will be notified with an
                  explanation.
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<strong>Data Deletion Confirmation</strong>}
              secondary={
                <Typography variant="body2" sx={{ fontSize: "14px" }}>
                  After the data deletion has been completed,{" "}
                  <strong>
                    you will receive a final email confirming that your personal
                    data has been fully removed
                  </strong>{" "}
                  from our records. This ensures that you have peace of mind
                  knowing that your information is no longer stored in our
                  system.
                </Typography>
              }
            />
          </ListItem>
        </List>

        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: { xs: "14px", sm: "16px" } }}
        >
          Our Commitment to Your Privacy
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: "14px" }}>
          We want to emphasize that at PowerCozmo,{" "}
          <strong>we take your privacy seriously</strong>. We do not retain or
          store your data beyond the time necessary for us to provide our
          services. Your data is stored in{" "}
          <strong>secure systems with encryption</strong> to prevent
          unauthorized access, and we regularly review our data management
          practices to ensure we comply with the highest security standards.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: "14px" }}>
          <strong>
            We do not share your data with third parties unless required by law
          </strong>
          , and we never use your data for purposes outside of providing our
          services. <strong>If you have any concerns</strong> about your data or
          how it is being handled, please do not hesitate to contact us at any
          time.
        </Typography>

        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: { xs: "14px", sm: "16px" } }}
        >
          We Are Here for You
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: "14px" }}>
          PowerCozmo’s support team is available <strong>24/7</strong> to assist
          you with any questions, concerns, or requests related to your data. We
          are dedicated to ensuring that you feel supported at all times,
          whether it’s for a data deletion request or any other service-related
          issue.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: "14px" }}>
          <strong>Your trust is essential to us</strong>, and we want to assure
          you that we are committed to being transparent and responsive to your
          needs. If you have any doubts or need further assistance, please reach
          out to our customer support team via email or through our contact
          page.
        </Typography>

        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: { xs: "14px", sm: "16px" } }}
        >
          Final Notes
        </Typography>
        <List sx={{ marginBottom: 2 }}>
          <ListItem>
            <ListItemText
              primary={
                <strong>
                  Data deletion requests are processed as quickly as possible
                </strong>
              }
              secondary={
                <Typography variant="body2" sx={{ fontSize: "14px" }}>
                  Please allow up to 48 hours for us to review and complete your
                  request.
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <strong>
                  Once your data is deleted, we will no longer be able to
                  recover it
                </strong>
              }
              secondary={
                <Typography variant="body2" sx={{ fontSize: "14px" }}>
                  Please ensure that you are certain about your decision.
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <strong>
                  If you have any active subscriptions or services linked to
                  your account
                </strong>
              }
              secondary={
                <Typography variant="body2" sx={{ fontSize: "14px" }}>
                  Please be aware that deletion may impact your access to these
                  services.
                </Typography>
              }
            />
          </ListItem>
        </List>

        <Typography variant="body1" paragraph sx={{ fontSize: "14px" }}>
          Thank you for being a valued part of the MerchantAD community. We are
          always here to help and ensure that your experience with us is safe,
          secure, and respectful of your privacy.
        </Typography>
      </StyledContainer>
    </div>
  );
}
