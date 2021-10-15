import SearchIcon from '../../assets/icons/search.svg';
import SortIcon from '../../assets/icons/sort_icon.svg';

export const stylesSearch = {
    mainContainer: {
        backgroundColor: '#ffffff',
        display: 'flex',
        alignContent: 'space-between',
        padding: [[10, 20]],
        borderRadius: '8px',
        marginBottom: 40,
        alignItems: 'center'
    },
    title: {
        color: '#283049',
        fontSize: 20,
        fontWeight: 600,
        marginRight: 50
    },
    count: {
        marginRight: 50
    },
    searchContainer: {
        width: '60%',
        display: 'flex',
        flexGrow: 1,
        '&:before': {
            content: '""',
            position: 'absolute',
            marginTop: 8,
            marginLeft: 7,
            width: 24,
            height: 24,
            background: `url(${SearchIcon}) center / contain no-repeat`
        }
    },
    searchInput: {
        borderRadius: '15px',
        border: 0,
        flexGrow: 1,
        padding: [[5, 40]],
        backgroundColor: '#f5f5fa',
        width: '100%',
        height: 30
    }
};

export const tableStyles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 'auto'
    },
    table: {
        borderCollapse: 'separate',
        borderSpacing: '0 3px'
    },
    asc: {
        '&:after': {
            top: '-1px !important',
            backgroundPosition: '0 5px'
        }
    },
    desc: {
        '&:after': {
            top: '3px !important',
            backgroundPosition: '0 -5px'
        }
    },
    tableHeader: {
        fontSize: 14,
        height: 30,
        '& tr': {
            '& th': {
                padding: [[10, 20]],
                cursor: 'pointer',
                '&:after': {
                    content: '""',
                    position: 'relative',
                    top: 1,
                    marginLeft: 3,
                    width: 10,
                    height: 10,
                    backgroundImage: `url(${SortIcon})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'auto 100%',
                    display: 'inline-block'
                }
            }
        }
    },
    numericValue: {
        textAlign: 'right'
    },
    textValue: {
        textAlign: 'left'
    },
    tableRow: {
        height: 53,
        backgroundColor: '#ffffff',
        '& td': {
            padding: [[10, 20]]
        },
        '& td:first-child': {
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8
        },
        '& td:last-child': {
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8
        }
    }
};