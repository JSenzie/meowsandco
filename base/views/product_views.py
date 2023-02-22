from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Product, HomeCarouselImage
from base.serializers import ProductSerializer, HomeCarouselImageSerializer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q


@api_view(['GET'])
def getProducts(request):
    
    queryTypes = request.GET.keys()



    if 'keyword' in queryTypes:
        query = request.query_params.get('keyword')
        lookups = Q(name__icontains=query) & Q(available=True) | Q(category__icontains=query) & Q(available=True) | Q(brand__icontains=query) & Q(available=True)
    elif 'category' in queryTypes:
        query = request.query_params.get('category')
        lookups = Q(category__icontains=query) & Q(available=True)
    else:
        query = ''
        lookups = Q(name__icontains=query) & Q(available=True) | Q(category__icontains=query) & Q(available=True) | Q(brand__icontains=query) & Q(available=True)


    
    products = Product.objects.filter(lookups).order_by('createdAt')

    if 'size' in queryTypes:
        size = request.query_params.get('size')

        products = products.filter(Q(size=size))


    page = request.query_params.get('page')
    paginator = Paginator(products, 8)

    try: 
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = ProductSerializer(products, many=True)

    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getCarouselImages(request):
    images = HomeCarouselImage.objects.all()
    serializer = HomeCarouselImageSerializer(images, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)

@api_view(['GET'])
def getUniqueBrands(request):
    brands = list(Product.objects.filter(available=True).exclude(brand__isnull=True).values_list('brand', flat=True).distinct())
    return Response(brands)

@api_view(['GET'])
def getUniqueCategories(request):
    categories = list(Product.objects.filter(available=True).exclude(category__isnull=True).values_list('category', flat=True).distinct())
    return Response(categories)

@api_view(['GET'])
def getUniqueSizes(request):
    sizes = list(Product.objects.filter(available=True).exclude(size__isnull=True).values_list('size', flat=True).distinct())
    return Response(sizes)