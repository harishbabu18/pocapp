package pocapp

class CustomerFilter {
    List<FilterValue> filterValues
    String sortDirection
    String sortColumn
}
class FilterValue {
    String key
    String value
    String operation

}