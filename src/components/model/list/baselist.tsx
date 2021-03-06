import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import './listScss.scss';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { HeadCells } from '../../../modles/headCells.model';
import { PaginateOptions } from '../../../modles/PaginateOptions';
import Pagination from "@material-ui/lab/Pagination";
import Filter from './filter';

// import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
const pageSizes = [5, 10, 15];
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}



interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCells[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    console.log(event, property, "ddd")
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell align="right">
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          /> */}
        </TableCell>
        {props.headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'right'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={headCell.enableSorting != false ? createSortHandler(headCell.id) : () => { }}
              className={`${headCell.enableSorting == false ? "enableSorting" : ''}`}
            >
              {headCell.label}
              {orderBy === headCell.id ? (

                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>

              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead >
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },

    highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.info.main,
          backgroundColor: lighten(theme.palette.info.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.info.dark

          ,
        },
    title: {
      flex: '1 1 100%',
    },
  }),
);

interface EnhancedTableToolbarProps {
  numSelected: number;
  header: string;
  filters: any;
  handleFilter: any;
}

const EnhancedTableToolbar = ({ numSelected, header, filters, handleFilter }: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const [showFilter, setShow] = useState(false)
  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} ??????????
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            {/* {header} */}
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              {/* <DeleteIcon /> */}
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="?????? ??????????">
            <IconButton aria-label="filter list">
              <FilterListIcon onClick={() => setShow(!showFilter)} />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      {showFilter && <div id="filter">
        {filters.map((filter: any) => {
          return (
            <Filter id={filter.id} type={filter.type} name={filter.name} onChange={(v: any) => handleFilter(v, filter.id)} />
          )
        })}
      </div>
      }
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '95%',
      margin: "auto",

    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      width: '100%',
      "&[aria-checked=true]": {
        backgroundColor: "blue"
      }
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

interface Props {
  rows: any[];
  headCells: HeadCells[];
  onSelect: any;
  header: string;
  onPaginationChange?: any;
  count: number;
  page: number;
  rowsPerPage: number;
  filters?: any;
}

export default function EnhancedTable({ rows, headCells, onSelect, header, onPaginationChange, count, page, rowsPerPage, filters }: Props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('calories');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [load, setLoad] = React.useState(false);
  // const [rows, setRows] = React.useState([..._rows]);

  const [_pagination, setPagination] = React.useState(new PaginateOptions());
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    _pagination.sort = {}
    _pagination.query = {};
  }, [])
  const handleRequestSort = async (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    let sort: any = {};
    if (property == 'name') {
      sort = { last_name: isAsc ? -1 : 1, first_name: isAsc ? -1 : 1 };;
    }
    else {
      sort[property] = isAsc ? -1 : 1;
    }
    _pagination.sort = sort;
    _pagination.pageNo = 0;
    console.log(_pagination.sort);
    await Promise.resolve(onPaginationChange(_pagination));
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = async (event: unknown, newPage: number) => {
    _pagination.pageNo = newPage + 1;
    setLoad(false);
    await Promise.resolve(onPaginationChange(_pagination, setLoad));
  };

  const handleChangeRowsPerPage = (event: any) => {

    _pagination.pageSize = parseInt(event.target.value);
    _pagination.pageNo = 0;
    onPaginationChange(_pagination)

  };



  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage ?? - Math.min(rowsPerPage ?? 0, rows.length - page ?? 0 * rowsPerPage ?? 0);

  function handleFilter(filter: any, id: any) {
    _pagination.query[id] = filter;
    _pagination.page=0;
    onPaginationChange(_pagination);
  }

  return (
    <div id="list" className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} header={header} filters={filters} handleFilter={handleFilter} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='small'
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {rows.length > 0 && stableSort(rows, getComparator(order, orderBy))
                .map((row: any, index) => {
                  console.log(row.name)
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(e) => handleClick(e, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                      color="primary"
                    >
                      <TableCell align="right">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event: any) => onSelect(row)}
                          inputProps={{ 'aria-labelledby': labelId }}
                          color="primary"
                        />
                      </TableCell>
                      {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell> */}
                      {Object.keys(row).map((cal: any) => {
                        if (cal != "_id") {
                          return (
                            <TableCell className={row[cal] == "???? ????????" ? "txt-red" : row[cal] < 0 ? "bg-red" : ''} align="right">{row[cal]}</TableCell>
                          )
                        }
                      })}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

      </Paper>
      {/* <div className="mt-3 d-ltr">
          {"Items per Page: "}
          <select onChange={(event) => handleChangeRowsPerPage(event)} value={rowsPerPage}>
            {

              pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
          </select>

          <Pagination
            className="my-3"
            count={count  }
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePage}
          />
        </div> */}
      
    </div>
  );
}