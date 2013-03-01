import dm
import seqfile

def meme_analysis(seqid,treemode,modelstring,pvalue,sendmail=False,block=False):
    # We need to tell the API the method
    # A meme analysis requires:
    # sequence
    # treemode
    # (Model String and Named Model may be redundant)
    # modelstring
    # namedmodel
    # pvalue

    # We need to have an option of whether they want mail
    # and/or want the call to block until finished, or neither

    #TODO: Have url friendly sequence ids

    method = "/seqfile/{0}/meme".format(seqid)
    response = dm.post(method,seqid=seqid,treemode=treemode,modelstring=modelstring,
                       pvalue=pvalue,sendmail=sendmail,block=block)
    return response

def get_meme_status(seqid,memeid):
    method = "/seqfile/{0}/meme/{1}".format(seqid,memeid)
    response = dm.get(method,params=None)
    return response

def parse_meme_results(seqid,memeid):
    method = "/seqfile/{0}/meme/{1}/parse".format(seqid,memeid)
    response = dm.get(method,params=None)
    return response

def get_meme_results(seqid,memeid):
    method = "/seqfile/{0}/meme/{1}/results".format(seqid,memeid)
    response = dm.get(method,params=None)
    return response

def mail_meme_results(seqid,memeid):
    method = "/seqfile/{0}/meme/{1}/mail".format(seqid,memeid)
    response = dm.get(method,params=None)
    return response

def get_all_meme():
    method = "/seqfile/{0}/meme".format(seqid)
    response = dm.get(method,params=None)
    return response

if __name__ == "__main__":

    mail = 'sweaver@ucsd.edu'
    fn   = '/home/sweaver/datamonkey-js/wrappers/res/HIV_gp120.nex'

    msa = seqfile.create_seqfile(fn,0,0,mail)

    #Neighbor Joining
    modelstring = "010010"
    treemode = 0
    pvalue = 0.5
    sendmail = True;

    #Start analysis. Receive ticket.
    meme = meme_analysis(msa["_id"],treemode,modelstring,pvalue,sendmail)
    print meme

    #Can continue polling
    for x in range(1000):
      print get_meme_status(msa["_id"],meme["id"])

    #msaid  = '512bcd83ed8920b771000001'
    #memeid = '5126925b0ca89ba230000002'
