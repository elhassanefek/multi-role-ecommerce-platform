import DashboardFilter from "../../features/dashboard/dashboardFilter";
import DashboardLayout from "../../features/dashboard/DashboardLayout";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

function Dashboard() {
  return (
    <>
      <Row type="horizontal" style={{ gap: "4rem" }}>
        <Heading as="h1">Dashboard </Heading>

        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
