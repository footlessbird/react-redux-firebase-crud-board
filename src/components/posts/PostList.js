import React from 'react'

const PostList = () => {
    return(
        <div className="post-list section">
        <table className="striped">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Writer</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>44</td>
                    <td>It's December now</td>
                    <td>Ramen mania</td>
                    <td>7th December, 12am</td>
                </tr>
                <tr>
                    <td>44</td>
                    <td>It's December now</td>
                    <td>Ramen mania</td>
                    <td>7th December, 12am</td>
                </tr>
                <tr>
                    <td>44</td>
                    <td>It's December now</td>
                    <td>Ramen mania</td>
                    <td>7th December, 12am</td>
                </tr>
                <tr>
                    <td>44</td>
                    <td>It's December now</td>
                    <td>Ramen mania</td>
                    <td>7th December, 12am</td>
                </tr>
            </tbody>
        </table>
        </div>
    )
}

export default PostList