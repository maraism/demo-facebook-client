
import '../assets/scss/components/Post.scss';

export default function Post(props) {
    const post = props.post;

    return (
        <article className='post'>
            <div className='resume'>
                {post.full_picture && (
                    <picture>
                        <img src={post.full_picture} alt="" />
                    </picture>
                )}
                <p>{post.message}</p>
            </div>
            <div className='insights-container'>
                <h2>Insights</h2>
                <div className='insights'>
                    {post.insights && post.insights.data.map((insight, index) => {
                        return (
                            <div key={index} className='insight'>
                                {insight.title} : <span>{insight.values[0].value}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </article>
    )
}