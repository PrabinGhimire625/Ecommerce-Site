import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableFour from '../components/Tables/TableFour';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import TableTwo from '../components/Tables/TableTwo';

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne /> {/* user table */}
        <TableTwo />  {/* product table */}
        <TableThree /> {/* order table */}
        <TableFour /> {/* category table */}
      </div>
    </>
  );
};

export default Tables;
