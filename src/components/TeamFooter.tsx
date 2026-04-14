import { motion } from 'motion/react';
import { Linkedin, Mail, Twitter, ChevronRight } from 'lucide-react';

export function TeamFooter() {
  return (
    <div className="bg-surface-light text-primary-dark pt-32 pb-12 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Team Section */}
        <div className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-sm uppercase tracking-[0.3em] text-accent-teal-dark font-bold mb-4">Leadership</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tight">The team behind the tech.</h3>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col md:flex-row gap-10 items-center md:items-start"
          >
            <div className="w-48 h-48 rounded-2xl overflow-hidden shrink-0 bg-gray-100 shadow-inner">
              <img 
                src="https://picsum.photos/seed/founder/400/400" 
                alt="Varshini CB" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
              />
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h4 className="text-3xl font-black mb-1">Varshini CB</h4>
              <p className="text-accent-teal-dark font-bold mb-4">CEO & Founder, VidyuthLabs</p>
              
              <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                Passionate about bridging the gap between advanced materials science and accessible healthcare technology. Currently pursuing a degree in Electrical and Electronics Engineering (6th Sem) at RVCE and serves as the Chief Subsystem Engineer at Team Antariksh.
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                {['Hardware Design', 'Embedded Systems', 'Materials Science'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex justify-center md:justify-start gap-4">
                <a href="https://linkedin.com/in/varshini-cb" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#0077b5]/10 text-[#0077b5] flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA & Footer */}
        <div className="border-t border-gray-200 pt-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tight mb-2">Ready to transform your lab?</h2>
            <p className="text-gray-500 font-medium">Pre-orders are open for research institutions.</p>
          </div>
          
          <button className="flex items-center gap-2 px-8 py-4 bg-primary-dark text-white rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300">
            Contact Sales <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mt-16 text-center flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 font-medium">
          <p>© {new Date().getFullYear()} VidyuthLabs. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary-dark transition-colors">info@vidyuthlabs.co.in</a>
            <a href="#" className="hover:text-primary-dark transition-colors">Privacy Policy</a>
          </div>
        </div>

      </div>
    </div>
  );
}
