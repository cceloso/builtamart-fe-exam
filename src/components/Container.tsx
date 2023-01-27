interface ContainerProps {
    styles?: string
    children: React.ReactNode
}

const Container = (props: ContainerProps) => {
    return (
        <div className={`px-4 md:px-12 ${props.styles}`}>
            {props.children}
        </div>
    )
}

export default Container