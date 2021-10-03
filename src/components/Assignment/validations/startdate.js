import moment from 'moment';


export default function valid(current) {
    var yesterday = moment().add(1, 'hours');
    return current.isAfter(yesterday);
}