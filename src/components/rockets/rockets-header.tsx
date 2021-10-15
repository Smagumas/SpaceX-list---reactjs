import { Component } from 'react';
import { OrderType } from '../../services/model/order.type';
import IRocketSortState from '../../services/model/rocket.sort-state.type';
import { RocketBasicSortTypes, RocketLengthSortTypes, RocketMassSortTypes, RocketSortTypes } from '../../services/model/rocket.sort.type';
import withStyles, { WithStylesProps } from 'react-jss';
import { tableStyles } from './styles';

interface Props extends WithStylesProps<typeof tableStyles> {
    className?: string,
    onSortClick(key: string, order: OrderType): void,
    onSortLengthClick(key: string, order: OrderType): void,
    onSortMassClick(key: string, order: OrderType): void,
};

interface State {
};

export class RocketsHeader extends Component<Props, State> {
    sortState: IRocketSortState;

    constructor(props: Props) {
        super(props);

        this.sortState = {
            column: 'rocket_name',
            order: OrderType.Asc
        }
    }


    onSortClick(key: RocketBasicSortTypes): void {
        this.setSortState(key);
        this.props.onSortClick(key, this.sortState.order);
    }

    onSortLengthClick(key: RocketLengthSortTypes): void {
        this.setSortState(key);
        this.props.onSortLengthClick(key, this.sortState.order);
    }

    onSortMassClick(key: RocketMassSortTypes): void {
        this.setSortState(key);
        this.props.onSortMassClick(key, this.sortState.order);
    }

    getSortOrder(key: RocketSortTypes): string {
        const { classes } = this.props;

        if (this.sortState.column === key) {
            return this.sortState.order === OrderType.Asc ? classes.asc : classes.desc;
        } else {
            return '';
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <thead className={classes.tableHeader}>
                <tr>
                    <th className={`${classes.textValue} ${this.getSortOrder('rocket_name')}`} onClick={() => this.onSortClick('rocket_name')}>
                        Rocket name
                    </th>
                    <th className={`${classes.numericValue} ${this.getSortOrder('diameter')}`} onClick={() => this.onSortLengthClick('diameter')}>
                        Diameter
                    </th>
                    <th className={`${classes.numericValue} ${this.getSortOrder('height')}`} onClick={() => this.onSortLengthClick('height')}>
                        Height
                    </th>
                    <th className={`${classes.numericValue} ${this.getSortOrder('mass')}`} onClick={() => this.onSortMassClick('mass')}>
                        Mass
                    </th>
                    <th className={`${classes.numericValue} ${this.getSortOrder('cost_per_launch')}`} onClick={() => this.onSortClick('cost_per_launch')}>
                        Cost per launch
                    </th>
                </tr>
            </thead>
        );
    }

    private setSortState(key: RocketSortTypes): void {
        let orderType = OrderType.Asc;
        if (this.sortState.column === key) {
            this.sortState.order = this.sortState.order === OrderType.Asc ? OrderType.Desc : OrderType.Asc;
        } else {
            this.sortState = {
                column: key,
                order: orderType
            }
        }
    }
}

export default withStyles(tableStyles)(RocketsHeader);