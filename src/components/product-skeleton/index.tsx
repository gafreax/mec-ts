import { Card, CardContent, CardHeader, CardMedia, Skeleton } from "@mui/material"

function ProductSkeleton() {
    return <Card>
        <CardHeader>
            <Skeleton animation="wave" />
        </CardHeader>
        <CardMedia>
            <Skeleton variant="rectangular" height={300} />
        </CardMedia>
        <CardContent>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
        </CardContent>
    </Card>
}

export default ProductSkeleton