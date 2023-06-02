

//fonction permettant de rechercher par nom ou par code
export const useFilter = (data: any[], search: string) => {
    if (search == "") {
        return data
    } else {
        return data.filter((item: any) => {
            if (item.nomproduit.toLowerCase().includes(search.toLowerCase()) || item.codeProduit.toLowerCase().includes(search.toLowerCase())) {
                return item
            }
        })
    }
}

//fonction permettant de rechercher par prix
export const useFilterByPrice = (data: any[], search: string) => {
    if (search == "") {
        return data
    } else {
        return data.filter((item: any) => {
            if (item.prixproduit == search) {
                return item
            }
        })
    }
}