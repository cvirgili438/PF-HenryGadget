

export const AverageRating = (reviews) => {
    let acu = 0;
    for (const review of reviews) {
        acu += parseInt(review.score)
    }
    return acu / reviews.length

}

export const IndexScore = (reviews) => {
    let scores = [1,2,3,4,5]    
    const index = scores.map(e => {
        let count = 0
        for (const review of reviews) { 
            if (review.score == e) {
                count++
            }
        }
        return count * 100 /reviews.length
    })
    return index
}


