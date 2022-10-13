import {ExpenditureOverviewContainer, ExpenditureRecord} from '../../components'

const Expenditure = () => {

    // placeholder objects, delete. Replace array with db array of objects
    const object1 = {
        recordId: 1,
        carparkId: 513,
        start: 4,
        end: 5,
        cost: 5.1
    }
    const object2 = {
        recordId: 2,
        carparkId: 193,
        start: 9,
        end: 1,
        cost: 6.25
    }
    const object3 = {
        recordId: 3,
        carparkId: 5513,
        start: 6,
        end: 7,
        cost: 8.1
    }
    const array = [object1, object2, object3]
    const costArray = array.map(object => object.cost)

    return (
        <div>
            <h1>Expenditure Records</h1>
            {array.map(object => <ExpenditureRecord {...object} />)}
            <ExpenditureOverviewContainer {...costArray}/>
        </div>
    )
}

export default Expenditure