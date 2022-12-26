

export const AverageRating = (reviews) => {
    let acu = 0;
    for (const review of reviews) {
        acu += parseInt(review.score)
    }
    return acu / reviews.length

}

export const ReviewsForRating = (reviews) => {
    let scores = [1,2,3,4,5]    
    let cout = 0
    scores.map(e => {
        for (const review of reviews) {
            review.score === 1?console.log('despues sigo') : console.log('despues sigo');;
        }
    })
}


