import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      image: "/src/assets/People.jpg",
      content:
        "Working with this team was a game-changer for our business. The website they built exceeded our expectations and helped us increase our online sales by 200%.",
      rating: 5,
      bgColor: "bg-blue-50",
    },
    {
      name: "Michael Chen",
      role: "Founder, GrowthLabs",
      image: "/src/assets/People.jpg",
      content:
        "The attention to detail and professional approach made all the difference. Our new website has significantly improved our user engagement.",
      rating: 5,
      bgColor: "bg-purple-50",
    },
    {
      name: "Emily Davis",
      role: "Marketing Director, InnovateCo",
      image: "/src/assets/People.jpg",
      content:
        "The team delivered an outstanding website that perfectly represents our brand. Their support even after launch has been exceptional.",
      rating: 5,
      bgColor: "bg-pink-50",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-50 rounded-full filter blur-3xl opacity-30"></div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full mb-6 text-sm font-medium">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from some of our satisfied
            clients about their experience working with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className={`${testimonial.bgColor} p-8 rounded-2xl`}>
                <Quote className="w-10 h-10 text-blue-600 mb-6 opacity-20" />

                <div className="mb-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="relative w-12 h-12 mr-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="absolute inset-0 w-full h-full rounded-full object-cover border-2 border-white"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
