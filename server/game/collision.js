function circleIntersect(x1, y1, r1, x2, y2, r2) {

    // Calculate the distance between the two circles
    let squareDistance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);

    // When the distance is smaller or equal to the sum
    // of the two radius, the circles touch or overlap
    return squareDistance <= ((r1 + r2) * (r1 + r2))
}

function applyVectorSpeed(obj1, obj2) {
    const vCollision = {
        x: obj2.position.x - obj1.position.x,
        y: obj2.position.y - obj1.position.y
    }
    const distance = Math.sqrt((obj2.position.x - obj1.position.x)*(obj2.position.x - obj1.position.x) + (obj2.position.y - obj1.position.y)*(obj2.position.y - obj1.position.y))
    const vCollisionNorm = {
        x: vCollision.x / distance,
        y: vCollision.y / distance
    }
    const vRelativeVelocity = {
        x: obj1.speed.x - obj2.speed.x,
        y: obj1.speed.y - obj2.speed.y
    }
    const speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y
    
    obj1.speed.x -= (speed * vCollisionNorm.x)
    obj1.speed.y -= (speed * vCollisionNorm.y)
    obj2.speed.x += (speed * vCollisionNorm.x)
    obj2.speed.y += (speed * vCollisionNorm.y)
}

function detectCollisionsWithWalls(object, gameWidth, gameHeight) {
    if (object.position.x <= 10 || object.position.x + object.radius + 10 >= gameWidth) object.speed.x = -object.speed.x
    if (object.position.y <= 10 || object.position.y + object.radius + 10 >= gameHeight) object.speed.y = -object.speed.y 
}

function checkIfGoalIsScored(ball, goal, goalSide) {
    if (goalSide !== "left" && goalSide !== "right") return false
    if (!(ball.position.y >= goal.position.y && ball.position.y <= goal.position.y + goal.scale.height)) return false

    if (goalSide === "left") {
        if (ball.position.x <= goal.position.x + goal.scale.height) return true
    } else {
        if (ball.position.x + ball.radius >= goal.position.x) return true
    }

    return false
}

module.exports = {
    circleIntersect,
    applyVectorSpeed,
    detectCollisionsWithWalls,
    checkIfGoalIsScored
}