export const isUserPresentQry  = () => {
    const qry = "SELECT * FROM blog.users u WHERE u.email = ?"
    return qry
}

export const registerNewUserQry  = () => {
    const qry = "INSERT INTO blog.users (username,email,`password`) VALUES(?,?,?)"
    return qry
}

export const getAllPostsQry  = () => {
    const qry = "SELECT * FROM blog.posts"
    return qry
}

export const getPostsByCatQry  = (postCat) => {
    const qry = `SELECT * FROM blog.posts p WHERE p.cat = "${postCat}"`
    return qry
}

export const getPostsByIdQry  = (postId) => {
    const qry = `SELECT p.id,p.title, p.description, p.img, p.date, p.cat, u.username, u.img as profileImage FROM blog.posts p INNER JOIN blog.users u ON p.userid = u.id WHERE p.id = "${postId}"`
    return qry
}

export const createPostQry  = () => {
    const qry = "INSERT INTO blog.posts  (title,description,img,date,userid,cat) VALUES(?,?,?,NOW(),?,?)"
    return qry
}

export const updatePostQry  = (postId,userId) => {
    const qry = `UPDATE blog.posts p SET p.title=?,p.description=?,p.img=?,p.date=NOW(),p.cat=? WHERE p.id=${postId} and p.userid=${userId}`
    return qry
}

export const deletePostQry  = (postId,userId) => {
    const qry = `DELETE FROM blog.posts p WHERE p.id=${postId} AND p.userid=${userId}`
    return qry
}