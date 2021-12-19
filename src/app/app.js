import * as React from 'react';
import Table from '../components/Table';
import BasicTextFields from '../components/Textfield';
import Barchart from '../components/Barchart';
import Loading from '../components/Loading';
import * as Utilities from '../utilities/utilities';
import * as Api from '../api/api';
import './app.scss'

function App() {

  const [apiSet, setApiSet] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [searchedKey, setSearchedKey] = React.useState('');
  const [searchedRows, setSearchedRows] = React.useState([]);
  const [searchToggle, setSearchToggle] = React.useState(false);
  const [favouriteList, setFavouriteList] = React.useState([]);

  const cols = [
    {
      id: 'name',
      label: 'Name',
    },
    {
      id: 'region',
      label: 'Region',
    },
    {
      id: 'capital',
      label: 'Capital',
    },
    {
      id: 'flag',
      label: 'Flag',
    },
  ];

  const setRowsData = async () => {
    let rowsData = [];
    const response = await Api.getAll();

    setApiSet(response);
    response.map(item => {
      rowsData.push({
        name: item.name.common,
        region: item.region,
        capital: Utilities.concatArrToStr(item.capital, ', '),
        flag: item.flags.svg
      });
    });
    setRows(rowsData);
  }

  const onChangeSearch = (event) => {
    const searchKeys = event.target.value;
    setSearchedKey(searchKeys);
    setSearchToggle(searchKeys.length > 0);

    const result = rows.filter((row) => {
      return row.name.toLowerCase().includes(searchKeys.toLowerCase()) || row.capital.toLowerCase().includes(searchKeys.toLowerCase())
    })
    setSearchedRows(result);
  }

  const favouriteOnChange = (value) => {
    setFavouriteList(value);
  }

  const renderLoading = () => {
    return (
      <div className='loadingWrapper'>
        <Loading />
      </div>
    )
  }

  const renderTable = () => {
    return (
      <>
        <div className='filterWrapper'>
          <BasicTextFields label='Search' onChange={onChangeSearch} />
        </div>
        <Table rows={searchToggle ? searchedRows : rows} cols={cols} favouriteOnChange={favouriteOnChange} searchedKey={searchedKey} />
      </>
    )
  }

  const renderBarChart = () => {
    let populationSet = [];
    favouriteList.map((fav) => {
      populationSet.push(apiSet.find(item => item.name.common === fav)?.population);
    });
    const datasets = [
      {
        label: 'Population',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: populationSet
      }];

    return (
      favouriteList.length > 0 &&
      <div className={`chartWrapper ${favouriteList.length > 10 && 'scale'}`}>
        <Barchart
          labels={favouriteList}
          datasets={datasets}
        />
      </div>
    );
  }

  React.useEffect(() => {
    setRowsData();
  }, [])

  return (
    <>
      {rows.length === 0 ? renderLoading() : renderTable()}
      {renderBarChart()}
    </>
  )
}

export default App;
